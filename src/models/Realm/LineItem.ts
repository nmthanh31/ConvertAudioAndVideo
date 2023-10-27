import Realm, { BSON } from "realm";
import Playlist from "./Playlist";

export default class LineItem extends Realm.Object<LineItem>{
  id!: string;
  name: string;
  type: string;
  path!: string;
  size: string;
  cDate: string;
  playlist?: Realm.Results<Playlist>;

  static schema = {
    name: 'LineItem',
    properties: {
      id: { type: 'string', default: () => new BSON.ObjectID().toString() },
      name: { type: 'string' },
      type: { type: 'string' },
      path: 'string',
      size: 'string',
      cDate: 'string?',
      playlist: {
        type: 'linkingObjects',
        objectType: 'Playlist',
        property: 'lineitems',
      },
      
    },
    primaryKey: 'id',
  };

  static make(
    realm: Realm,
    id: string,
    name: string,
    type: string,
    path: string,
    size: string,
    cDate: string,
  ) {
    let results = realm.objectForPrimaryKey('LineItem', id);
    if (!results) {
      const data = {
        id,
        name,
        type,
        path,
        size,
        cDate
      };
      results = realm.create<LineItem>('LineItem', data);
      console.log('Create New LineItem');
    }
    return results;
  }
  constructor(
    realm: Realm,
    name: string,
    type: string,
    path: string,
    size: string,
    cDate: string,
  ) {
    super(realm, {
      id : new BSON.ObjectID().toString(),
      name,
      type,
      path,
      size,
      cDate
    });
  }
}