type AnyObject = {
  [key: string]: any;
};

interface MapEntry {
  (key: string, value: any): [string, any];
}

interface MapKey {
  (key: string, value: any): string;
}

interface MapValue {
  (key: string, value: any): any;
}

export const mapObjEntries = (obj: AnyObject, mapEntry: MapEntry): AnyObject =>
  Object.keys(obj).reduce((acc, cur) => {
    const [key, value] = mapEntry(cur, obj[cur]);
    return {
      ...acc,
      [key]: value,
    };
  }, {});

export const mapObjKey = (obj: AnyObject, mapKey: MapKey): AnyObject =>
  mapObjEntries(obj, (key, value) => [mapKey(key, value), value]);

export const mapObjValue = (obj: AnyObject, mapValue: MapValue): AnyObject =>
  mapObjEntries(obj, (key, value) => [key, mapValue(key, value)]);
