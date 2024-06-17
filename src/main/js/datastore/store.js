/**
 * @module EventMap
 * @copyright Copyright (c) 2019-present cheratt karim
 * @license MIT Licence
 */


/**
 * Used to manage (set/delete) entities
 * It converts entities JSON Object to a Map Object to manage entities
 * @params {Object} entitiesMap
 */


function DataStore(storeName) {

  var _data = [];

  this.init = function(storeData){
    _data = storeData;
  }

  this.getStoreName = function(){
    return storeName;
  }

  /**
   * 
   * @param {*} _JSONStore A JSON Object
   */
  this.init = function (_JSONStore) {
    _data = _JSONStore;
  }

  /**
   * 
   * @returns Array<entity>
   */
  this.getData = function (criteria) {
    const field = !!criteria && Object.keys(criteria);
    if (field.length > 0) {
      var result = [];
      _data.forEach(element => {
        let ok = true;
        field.forEach(function (_field) {
          ok = ok && (element[_field] === criteria[_field]);
        });
        if (ok) {
          // push a COPY of the element
          result.push(Object.assign({} , element));
        }
      });
      return result;
    }
    else {
      // return a COPY all elements
      return _data.slice();
    }
  }

  // this.setData = function (criteria , entity) {
  //   var _entity = this.getData(criteria);
  //   this.isUnique(_entity);
  //   if(_entity[0].id){
  //     // update
  //     entity = entity;
  //   }
  //   else {
  //     // add new one
  //     entity[0].id = this.generateID(type);
  //     _data.push(entity[0]);
  //   }
  // }

  /**
   * 
   * @param {*} type 
   * @param {*} id 
   * @returns 
   */
  // this.remove = function (criteria) {
  //   var entity = this.getData(criteria);
  //   this.isUnique(entity);
  //   if (entity[0]) {
  //     _data = _data.filter(item => {
  //       return (item[0].id !== id);
  //     });
  //   }
  // }

  // this.isUnique = function(_result){
  //   if (typeof _result.length != 'undefined' && _result.length > 1) {
  //     var msg = `DataStore ${this.name}: there is multiple entity with the same criterias - `;
  //     msg += "You can SET and DELETE one entity at time";
  //     throw Error(msg);
  //   }
  // }
}

module.exports = DataStore;