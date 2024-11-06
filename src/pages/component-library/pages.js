
import PageHome from './PageHome.vue'
import PagePresentationalAtoms from './PagePresentationalAtoms.vue'
import PagePresentationalMolecules from './PagePresentationalMolecules.vue'
import PagePresentationalOrganisms from './PagePresentationalOrganisms.vue'
import PageContainerGeneral from './PageContainerGeneral.vue'
import PageContainerUser from './PageContainerUser.vue'

export const COMPONENT_LIBRARY_PAGES = {
  COMPONENT_LIBRARY_HOME: {
    component: PageHome
  },
  COMPONENT_LIBRARY_PRESENTATIONAL_ATOMS: {
    component: PagePresentationalAtoms
  },
  COMPONENT_LIBRARY_PRESENTATIONAL_MOLECULES: {
    component: PagePresentationalMolecules
  },
  COMPONENT_LIBRARY_PRESENTATIONAL_ORGANISMS: {
    component: PagePresentationalOrganisms
  },
  COMPONENT_LIBRARY_CONTAINER_GENERAL: {
    component: PageContainerGeneral
  },
  COMPONENT_LIBRARY_CONTAINER_USER: {
    component: PageContainerUser
  }
}
