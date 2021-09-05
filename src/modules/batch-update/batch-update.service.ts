import { HttpClientService } from "../http/http-client.service";

interface Input {
  url: string;
  verb: "PUT" | "POST" | "GET";
  payloads: Array<{
    body: Record<string, unknown>;
    pathParams: Array<{
      key: string;
      value: string;
    }>;
  }>;
}

export class BatchUpdateService {
  public constructor(private readonly httpClient: HttpClientService) {}

  public async batchUpdate({ url, verb, payloads = [] }: Input) {
    console.log("🚀 ~ input", url, verb, payloads);
    const method = verb.toLocaleLowerCase() as "get" | "post" | "put";
    const urls = this.prepareUrls(payloads, url);
    const requests = [];
    for (let i = 0; i < urls.length; i++) {
      let url = urls[i];
      requests.push(this.httpClient[method](url));
    }

    const responses = await Promise.allSettled(requests);
    console.log("🚀 ~  responses", responses);
    console.log("\n\n\n\n\n");

    return this.prepareResults(responses as any);
  }

  private prepareUrls(
    payloads: {
      body: Record<string, unknown>;
      pathParams: { key: string; value: string }[];
    }[],
    url: string
  ) {
    return payloads.map(({ pathParams }) => {
      let updatedUrl = url;
      pathParams.forEach(({ key, value }) => {
        updatedUrl = url.replace(`{${key}}`, value);
      });
      return url;
    });
  }

  private prepareResults(
    responses: Array<{ status: string; value: Record<string, unknown> }>
  ) {
    return responses.map((result) => (result as any).status);
  }
}
