require('dotenv').config()
const { expect } = require('@playwright/test')

export class API {
    constructor(request) {
        this.request = request
        this.token = undefined
        this.baseApi = process.env.BASE_API
    }

    async setToken() {
        const response = await this.request.post(`${this.baseApi}/sessions`, {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        this.token = `Bearer ${body.token}`

    }

    async postMovies(movie) {

        //await this.setToken()

        const companyId = await this.getCompanyIdByName(movie.company)

        const response = await this.request.post(`${this.baseApi}/movies`, {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.feature,
                cover: movie.cover
            }
        })

        expect(response.ok()).toBeTruthy()
    }

    async getCompanyIdByName(companyName) {

        //await this.setToken()
        
        const response = await this.request.get(`${this.baseApi}/companies`, {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            params: {
                name: companyName,
            }
        })

        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        return body.data[0].id

    }

    async postTvShows(tvShows) {

        const companyId = await this.getCompanyIdByName(tvShows.company)

        const response = await this.request.post(`${this.baseApi}/tvshows`, {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            multipart: {
                title: tvShows.title,
                overview: tvShows.overview,
                company_id: companyId,
                release_year: tvShows.release_year,
                seasons: tvShows.season,
                featured: tvShows.featured,
                cover: tvShows.cover

            }
        })
        expect(response.ok()).toBeTruthy()
    }

}
