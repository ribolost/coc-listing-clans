import axios, { AxiosInstance } from 'axios';
import {
  COC_API_METHODS,
  COC_API_TOKEN,
  COC_API_URL,
} from '../configs/constants';
import {
  Clan,
  CoCAPIClansResponse as CoCAPIClansMethodResponse,
  CoCParamsAPIClans as CoCAPIClansMethodParams,
  PagingType,
} from '../interfaces/cocApi';
// axios.defaults.baseURL = 'https://api.clashofclans.com/v1/';

export default class ClashOfClans {
  private httpClient: AxiosInstance;
  private responseClansMethod: {
    params: CoCAPIClansMethodParams;
    response: CoCAPIClansMethodResponse;
  };

  constructor() {
    // const baseUrl = COC_API_URL;
    // const requestTimeout = 10000;
    // const apiKey = COC_API_TOKEN;
    // this.httpClient = axios.create({
    //   baseURL: baseUrl,
    //   timeout: requestTimeout,
    //   headers: {
    //     Authorization: `Bearer ${apiKey}`,
    //     Accept: 'application/json',
    //     'Access-Control-Allow-Origin': '*',
    //   },
    // });
  }

  public async getClans(params: CoCAPIClansMethodParams): Promise<Clan[]> {
    const url = `${COC_API_URL}${COC_API_METHODS.clans}`;
    console.log(`${url}?name=aaa&limit=2`, url);
    const dataApiResponse: CoCAPIClansMethodResponse = await (
      await axios.get(`${url}?name=aaa&limit=2`, {
        headers: {
          Authorization: `Bearer ${COC_API_TOKEN}`,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Methods': '*',
          'Access-Control-Allow-Headers': '*',
        },
      })
    )?.data;
    if (!dataApiResponse) return;
    const clans = dataApiResponse.items;
    params.after = dataApiResponse.paging.cursors.after;
    params.before = dataApiResponse.paging.cursors.before;
    this.responseClansMethod = { params, response: dataApiResponse };
    return clans;
  }

  public async clansPagination(pagingType: PagingType): Promise<Clan[]> {
    const pagingAux = {
      after: this.responseClansMethod.params.after,
      before: this.responseClansMethod.params.before,
    };
    this.responseClansMethod.params.after = null;
    this.responseClansMethod.params.before = null;
    this.responseClansMethod.params[pagingType] = pagingAux[pagingType];
    if (!this.responseClansMethod) return;
    return this.getClans(this.responseClansMethod.params);
  }
}
