import environment from './environment';
import {LogManager, inject} from 'aurelia-framework';
import {Router} from 'aurelia-router';

let logger = LogManager.getLogger('people-edit');

@inject(Router)
export class PeopleEdit {
  constructor(router) {
    this.router = router;
  }
  contact = {"id": "5763cd4d9d2a4f259b53c901", "photo": "https://randomuser.me/portraits/women/59.jpg", "firstname": "Leanne", "lastname": "Woodard", "entity": "BIOSPAN", "email": "Leanne.Woodard@BIOSPAN.com", "skills": ["pariatur", "ipsum", "laboris", "nostrud", "elit"], "phone": "0784112248", "links": { "twitter": "https://twitter.com/laboris", "slack": "https://slack.com/fugiat", "github": "https://github.com/velit", "linkedin": "https://www.linkedin.com/in/voluptate"}, "isManager": false, "manager": "Erika", "managerId": "5763cd4d3b57c672861bfa1f"};

  activate(params, routeConfig, navigationInstruction) {
    if (environment.debug) logger.info(`edit contact ${params.id}`);
  }

  save() {
    this.router.navigateToRoute('people-show', { id: this.contact.id })
  }
}
