//
console.log('EVENTBOX-ADMIN-' + "1.0.0");

const host = window.document.location.origin;
///////////////////////////////////////////////////
const hostAPI = host + "/api";
///////////////////////////////////////////////////
const login_url = `${hostAPI}/login`;
const log_out_url = `${hostAPI}/logout`;
const auth_token_url = `${hostAPI}/auth_token`;
///////////////////////////////////////////////////
// const thing_url = `${hostAPI}/things`; 
// const event_url = `${hostAPI}/cloudevents`;
// const listener_url = `${hostAPI}/listener_endpoints`;
///////////////////////////////////////////////////
// const eventbinding_url = `${hostAPI}/eventbinding`;
///////////////////////////////////////////////////
const activity_url = `${hostAPI}/activity`;
///////////////////////////////////////////////////
///////////////////////////////////////////////////

const Config = {
  host: host,
  url: {
    data: {
      thing: function (method, thing_id) {
        if (method == 'get' || method == 'post') {
          return `${hostAPI}/things`;
        }
        if (method == 'put' || method == 'delete') {
          return `${hostAPI}/things/${thing_id}`;
        }
      },
      event: function (method, event_id) {
        if (method == 'get' || method == 'post') {
          return `${hostAPI}/cloudevents`;
        }
        if (method == 'put' || method == 'delete') {
          return `${hostAPI}/cloudevents/${event_id}`;
        }
      },
      listener_endpoint:  function (method, listener_id) {
        if (method == 'get' || method == 'post') {
          return `${hostAPI}/listeners`;
        }
        if (method == 'put' || method == 'delete') {
          return `${hostAPI}/listeners/${listener_id}`;
        }
      },
      eventbinding:  function (method , event_id , listener_id) {
        if (method == 'get' || method == 'post') {
          return `${hostAPI}/eventbinding`;
        }
        if (method == 'delete') {
          return `${hostAPI}/eventbinding/${event_id}/${listener_id}`;
        }
      }
    },
    activity: activity_url,
    login: login_url,
    auth_token: auth_token_url,
    log_out: log_out_url
  }
}

export default Config;