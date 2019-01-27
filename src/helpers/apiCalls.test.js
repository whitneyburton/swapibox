import { fetchData } from './apiCalls';

describe('apiCalls', () => {
  let mockUrl;
  let mockData;

  beforeEach(() => {
    mockUrl = 'https://swapi.co/api/planets/';
    mockData = [{}, {}, {}];

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      json: () => Promise.resolve(mockData),
      ok: true,
    }));
  });
  
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchData', () => {
    it('should call fetch with correct params and number of times', () => {
      fetchData(mockUrl);
      expect(window.fetch).toHaveBeenCalledTimes(1);
      expect(window.fetch).toHaveBeenCalledWith(mockUrl);
    });

    it('should return data if everything is ok', async () => {
      const expected = mockData;
      const result = await fetchData(mockUrl);
      expect(result).toEqual(expected);
    });

    it('should throw an error if everything is not ok', async () => {
      const expectedError = Error('Error fetching data.');
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        status: 401,
        ok: false,
      }));
      await expect(fetchData(mockUrl)).rejects.toEqual(expectedError)
    })
  });
});