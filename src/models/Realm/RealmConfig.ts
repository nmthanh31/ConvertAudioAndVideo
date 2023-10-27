import { createRealmContext } from '@realm/react';
import Playlist from './Playlist';
import LineItem from './LineItem';



export const SyncedRealmContext = createRealmContext({
  // Pass all of your models into the schema value.
  schema: [Playlist, LineItem],

});
