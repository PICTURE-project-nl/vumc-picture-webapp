/* eslint-disable */

//import Router from '../../router/index';  // Edit Greg
import MobileDetect from 'mobile-detect';

class DetectionLoader{
  constructor(){
    this.redirect_handler = new MobileDetect(window.navigator.userAgent);
    this.is_mobile = this.isMobile();
  }

  getPrefix(){
    return this.is_mobile ? 'm' : 'd';
  }

  // Check if the current device is a mobile or a tablet
  isMobile(){
    return !!(this.redirect_handler.mobile() || this.redirect_handler.tablet() || window.innerWidth < 700);
  }

  // Check if the current Url should be redirected
  shouldRedirect(current_route){
    return (current_route.name === 'home')
        || (current_route.params.prefix === 'm' && !this.is_mobile)
        || (current_route.params.prefix === 'd' && this.is_mobile)
  }

  redirectUrl(route){
    let route_name = (route.name === 'home' ? 'onboarding' : route.name);
    let route_params = Object.assign(route.params, { prefix: this.getPrefix() });

    let new_route = this.transformUrl(route_name, route_params, route.query);
    // if(new_route) Router.push(new_route.fullPath);  // Edit Greg
  }

  transformUrl(name, params, query = {}){
    /* // Edit Greg
    return Router.matcher.match({
      name: name,
      params: params,
      query: query
    });
    */
  }

}

export { DetectionLoader };

/* eslint-enable */
