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
    const baseUrl = COC_API_URL;
    const requestTimeout = 300000;
    const apiKey = COC_API_TOKEN;
    this.httpClient = axios.create({
      baseURL: baseUrl,
      timeout: requestTimeout,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  public async getClans(params: CoCAPIClansMethodParams): Promise<Clan[]> {
    const url = `${COC_API_METHODS.clans}`;
    const dataApiResponse: CoCAPIClansMethodResponse = await (
      await this.httpClient.get(`${url}`, {
        params,
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

  public async getAllClans(): Promise<Clan[]> {
    const params: CoCAPIClansMethodParams = {
      minMembers: 2,
      limit: 100,
      after: null,
    };
    const url = `${COC_API_METHODS.clans}`;
    const searchClans = (pagingToken = undefined, clansAccumulated = []) =>
      this.httpClient
        .get(`${url}`, {
          params,
        })
        .then((apiResponse) => apiResponse.data)
        .then((clansResponse: CoCAPIClansMethodResponse) => {
          const clans = clansAccumulated.concat(clansResponse.items);

          return clansResponse.paging.cursors.after
            ? searchClans(clansResponse.paging.cursors.after, clans)
            : clans;
        });

    return searchClans();
  }
}
