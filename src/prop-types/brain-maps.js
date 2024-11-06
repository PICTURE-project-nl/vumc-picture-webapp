
import every from 'lodash/every'
import { brainMapFolderModel } from '@/store/brain-maps/model'
import { objectsHaveSameKeys } from '@/assets/scripts/utils/objects-have-same-keys'

const brainMapsPropTypes = {}

brainMapsPropTypes.foldersArray = {
  type: Array,
  validator: items => every(items, (item) => objectsHaveSameKeys(item, brainMapFolderModel))
}

brainMapsPropTypes.brainMapsArray = {
  type: Array
  // Doesn't work anymore because of uploading file
  // validator: items => every(items, (item) => objectsHaveSameKeys(item, brainMapModel))
}

export { brainMapsPropTypes }
