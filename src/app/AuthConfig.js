import Servicios from "Servicios";


export default class AuthConfig {

    constructor() {
        this.clientId = process.env.SLACK_CLIENT_ID;
        this.clientSecret = process.env.SLACK_CLIENT_SECRET;
        this.signingSecret = process.env.SLACK_SIGNING_SECRET;
        this.redirectUrl = '/oauth/v2/authorize';
        this.stateCheck = this.stateCheck;
        this.onSuccess = this.onSuccess;
        this.onError = this.onError;
    }

    stateCheck(oAuthState) {
        return true
    }

    onSuccess({res, oAuthResult}) {
        Servicios.get('tokens').setTokens(oAuthResult);
        res.redirect('/confirmacion.html');
    }

    onError({res, error}) {
        console.log(error);
        res.redirect('/error.html');
    }
}