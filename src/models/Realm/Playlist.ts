import Realm from 'realm';
import { BSON } from 'realm';
import LineItem from './LineItem';

export default class Playlist extends Realm.Object<Playlist>{
  id!: string;
  name: string;
  description?: string;
  lineitems: Realm.List<LineItem>;
  imgPath?: string;

  static schema = {
    name: 'Playlist',
    properties: {
      id: { type: 'string', default: () => new BSON.ObjectID().toString() },
      name: { type: 'string' },
      description: { type: 'string?' },
      lineitems: { type: 'list', objectType: 'LineItem' },
      imgPath: 'string?'
    },
    primaryKey: 'id',
  };
  constructor(
    realm: Realm,
    name: string,
    description?: string,
    imgPath?: string,
  ) {
    super(realm, {
      id: new BSON.ObjectID().toString(),
      name,
      description,
      imgPath,
    });
  }
};