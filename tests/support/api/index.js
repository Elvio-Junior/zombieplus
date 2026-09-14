require('dotenv').config()
const { expect } = require('@playwright/test')

export class API {
    constructor(request) {
        this.request = request
        this.token = undefined
        this.baseApi = process.env.BASE_API
    }

    async setToken() {
        const response = await this.request.post(`${this.base}/sessions`, {
            data: {
                email: 'admin@zombieplus.com',
                password: 'pwd123'
            }
        })

        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        this.token = `Bearer ${body.token}`

    }

    async postMovie(movie) {

        //await this.setToken()

        const companyId = await this.getCompanyIdByName(movie.company)

        console.log(companyId)

        const response = await this.request.post(`${this.base}/movies`, {
            headers: {
                Authorization: this.token,
                ContentType: 'multipart/form-data',
                Accept: 'application/json, text/plain, */*'
            },
            data: {
                title: movie.title,
                overview: movie.overview,
                company_id: companyId,
                release_year: movie.release_year,
                featured: movie.feature,
                
            }
        })

        expect(response.ok()).toBeTruthy()

        const body = JSON.parse(await response.text())

        this.token = body.token

    }

    async getCompanyIdByName(companyName) {

        //await this.setToken()

        const response = await this.request.get(`${this.base}/companies`, {
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
}