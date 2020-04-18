const assert = require('chai').assert;
const axios = require('axios');
//const signUp = require('../routes/user.js').signUp;

describe('Account Creation Errors', () => {
    it("signup should return a response status 400: Passwords do not match", async () => {
        const body = JSON.stringify({email: "fread@test.com", password: "12345", confirmPassword: "1235"})
        const config = {
            headers: {
                "Content-type": "application/json"
             }};
       
        let result = await axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/signup', body, config)
          .then((res) => {
            return res
          })
          .catch((err) => {
            return err
          })

        assert.equal(result.response.status, 400);
    });

    it("signup should return a response status 400: Cannot have a password less than 6 characters", async () => {
        const body = JSON.stringify({email: "fread@test.com", password: "12345", confirmPassword: "12345"})
        const config = {
            headers: {
                "Content-type": "application/json"
             }};
       
        let result = await axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/signup', body, config)
          .then((res) => {
            return res
          })
          .catch((err) => {
            return err
          })

        assert.equal(result.response.status, 400);
    });

    it("signup should return a response status 400: Email has already been taken", async () => {
        const body = JSON.stringify({email: "fake@email.com", password: "12345", confirmPassword: "12345"})
        const config = {
            headers: {
                "Content-type": "application/json"
             }};
       
        let result = await axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/signup', body, config)
          .then((res) => {
            return res

          })
          .catch((err) => {
            return err
          })

        assert.equal(result.response.status, 400);
    });
});

//const signUp = require('../routes/user.js').login;

describe('Account Login Errors', () => {
    it("login should return a response status 403: Account not verified", async () => {
        const body = JSON.stringify({email: "fread@test.com", password: "12345"})
        const config = {
            headers: {
                "Content-type": "application/json"
             }};
       
        let result = await axios.post('https://us-central1-pickup-proj.cloudfunctions.net/api/login', body, config)
          .then(async (res) => {
            let token = res.data.token;
            let auth = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": "Bearer " + token,
                    "Access-Control-Headers": "Content-type, authorization"
                }
            }
            return res
            return await axios.get('https://us-central1-pickup-proj.cloudfunctions.net/api/user', auth)
            .then(res => {
                let user = {token, ...res.data.credentials}
                console.log(res)
                return res
            })
            .catch((err) => {
                console.log(err)
                return err
            })
          .catch((err) => {
            console.log(err)
            return err
          })
        })
        console.log(result)
        assert.equal(result.response.status, 403);
    });
});
