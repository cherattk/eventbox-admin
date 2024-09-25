/**
 * @module store
 * @copyright Copyright (c) 2019-present cheratt karim
 * @license MIT Licence
 */

import {get as lodash_get} from 'lodash';


export default class DataStore {

	constructor(storeName){
		this._storeName = storeName;
		this._data = [];
	}
	
	init(jsonData){
		this._data = jsonData;
	}

	getDataByArrayCriteria(criteria) {	
		if (criteria.length > 0) {
			var result = [];
			this._data.forEach(element => {
				let ok = true;
				criteria.forEach(function(_field) {
					let fieldValue = lodash_get(element, _field[0]);
					ok = ok && (fieldValue === _field[1]);
				});
				if (ok) {
					// push a COPY of the element
					result.push(Object.assign({}, element));
				}
			});
			return result;
		}
		else {
			// return a COPY of all elements
			return this._data.slice();
		}
	}

	/**
	 * @deprecated , use getDataByArrayCriteria()
	 * 
	 */
	getData(criteria) {
		const field = !!criteria && Object.keys(criteria);
		if (field.length > 0) {
			var result = [];
			this._data.forEach(element => {
				let ok = true;
				field.forEach(function(_field) {
					ok = ok && (element[_field] === criteria[_field]);
				});
				if (ok) {
					// push a COPY of the element
					result.push(Object.assign({}, element));
				}
			});
			return result;
		}
		else {
			// return a COPY of all elements
			return this._data.slice();
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