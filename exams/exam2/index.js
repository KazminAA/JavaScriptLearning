const ProjectModule = (function () {
	let project;
	return {
		getInstance: function () {
			if (!project) {
				project = {
					participants: [],
					pricing: {},
					isBusy: false,

					/* implement initialization of the object */
					/* participants - predefined array of participants */
					/* pricing - predefined object (keyvalue collection) of pricing */
					init(participants, pricing) {
						if (arguments.length === 2 && participants instanceof Array && pricing instanceof Object
							&& participants.every((e) => e.hasOwnProperty('seniorityLevel'))) {

							this.participants = participants.slice();
							this.pricing = JSON.parse(JSON.stringify(pricing));

						}
					},

					/* pass found participant into callback, stops on first match */
					/* functor - function that will be executed for elements of participants array */
					/* callbackFunction - function that will be executed with found participant as argument or with null if not */
					/* callbackFunction (participant) => {} */
					findParticipant(functor, callbackFunction) {
						if (this.isBusy === true) return false;

						const found = function (obj) {
							let participant = null;
							for (let i = 0; i < obj.participants.length; i++) {
								if (functor(obj.participants[i])) {
									participant = obj.participants[i];
									break;
								}
							}
							obj.isBusy = false;
							callbackFunction(participant);
						};

						this.isBusy = true;
						setTimeout(found(this));
					},

					/* pass array of found participants into callback */
					/* functor - function that will be executed for elements of participants array */
					/* callbackFunction - function that will be executed with array of found participants as argument or empty array if not */
					/* callbackFunction (participantsArray) => {} */
					findParticipants(functor, callbackFunction) {
						if (this.isBusy === true) return false;

						const found = function (obj) {
							let participants = [];
							for (let i = 0; i < obj.participants.length; i++) {
								if (functor(obj.participants[i])) {
									participants.push(obj.participants[i]);
								}
							}

							obj.isBusy = false;
							callbackFunction(participants);
						};

						this.isBusy = true;
						setTimeout(found(this));
					},

					/* push new participant into this.participants array */
					/* callbackFunction - function that will be executed when job will be done */
					/* (err) => {} */
					addParticipant(participantObject, callbackFunction) {
						if (this.isBusy === true) return false;

						const add = function (obj) {
							let err;

							if (participantObject.hasOwnProperty('seniorityLevel')) {
								obj.participants.push(participantObject);
							} else {
								err = "Argumennt is not correct!"
							}

							obj.isBusy = false;
							callbackFunction(err);
						};

						this.isBusy = true;
						setTimeout(add(this));
					},

					/* push new participant into this.participants array */
					/* callback should receive removed participant */
					/* callbackFunction - function that will be executed with object of removed participant or null if participant wasn't found when job will be done */
					removeParticipant(participantObject, callbackFunction) {
						if (this.isBusy === true) return false;

						const remove = function (obj) {
							let result = null;
							let indexOfRemoved = obj.participants.indexOf(participantObject);
							if (indexOfRemoved !== -1) {
								result = obj.participants[indexOfRemoved];
								obj.participants.splice(indexOfRemoved, 1);
							}

							obj.isBusy = false;
							callbackFunction(result);
						};

						this.isBusy = true;
						setTimeout(remove(this));
					},

					/* Extends this.pricing with new field or change existing */
					/* callbackFunction - function that will be executed when job will be done, doesn't take any arguments */
					setPricing(participantPriceObject, callbackFunction) {
						if (this.isBusy === true) return false;

						const set = function (obj) {
							Object.assign(obj.pricing, participantPriceObject);

							obj.isBusy = false;
							callbackFunction();
						};

						this.isBusy = true;
						setTimeout(set(this));
					},

					/* calculates salary of all participants in the given period */
					/* periodInDays, has type number, one day is equal 8 working hours */
					calculateSalary(periodInDays) {
						let salary = 0;
						this.participants.forEach((e) => {
							if (!this.pricing[e['seniorityLevel']]) {
								throw "error: pricing wasn\\'t found!"
							}
							salary += this.pricing[e['seniorityLevel']] * periodInDays * 8;
						});
						return salary;
					}

				}
			}
			return project;
		}
	}
})();

/*let run = ProjectModule.getInstance();
const participants = [{ seniorityLevel: 'intermediate' }];
run.init(participants, {});*/


module.exports = {
	firstName: 'Alexandr',
	lastName: 'Kazmin',
	task: ProjectModule.getInstance()
};
