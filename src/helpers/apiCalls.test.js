import apiCalls, { fetchFilmScript } from './apiCalls';

describe('apiCalls', () => {
  describe('fetchFilmScript', () => {

    beforeEach(() => {
    })
    
    it('should fetch with the correct params', () => {
      let mockUrl = 'www.google.com';
      fetchFilmScript(mockUrl)
      expect(window.fetch).toHaveBeenCalledWith(mockUrl)
    })

    it('should return films if everything is ok', () => {

    })

    // it('should throw an error if everything is not ok', async () => {
    //   const expectedError = Error('Error fetching films data.');
    //   window.fetch = jest.fn().mockImplementation(() => {
    //     Promise.resolve({
    //       status: 401,
    //       ok: false
    //     })
    //   });

    // })
  })
})