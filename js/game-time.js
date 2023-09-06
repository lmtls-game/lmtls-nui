/**
 * @property {number} time -Time in seconds.
 * @property {number} hours -Hour based on the minutes.
 * @property {number} minutes -Minute based on the seconds.
 */
class GameTime {
	constructor(time) {
		this.time = time ?? 0;
		this.calculate();
	}

	calculate() {
		this.minutes = this.time % 60;
		this.hours = Math.trunc((this.time / 60) % 24);
	}

	advanceMinutes() {
		this.advanceMinutesBy(1);
	}

	advanceMinutesBy(minutes) {
		this.time += minutes;
		this.calculate();
	}

	advanceHours() {
		this.advanceHoursBy(1);
	}

	advanceHoursBy(hours) {
		this.time += (hours * 60);
		this.calculate();
	}

	/**
	 * Callback for watching time.
	 *
	 * @callback WatchTimeCallback
	 * @param {int} hours
	 * @param {int} minutes
	 */

	/**
	 * Watch time.
	 * @param {WatchTimeCallback} callback
	 */
	start(callback) {
		if (this._interval || !callback) {
			return;
		}
		this._interval = setInterval(() => {
			this.advanceMinutes();
			callback(this.hours, this.minutes);
		}, 1000);
	}

	stop() {
		if (this._interval === undefined) {
			return;
		}

		clearInterval(this._interval);
		this._interval = undefined;
	}

	toP() {
		return this.hours >= 12 ? "PM" : "AM";
	}

	withPadding(value) {
		return value.toString().padStart(2, "0");
	}

	toString() {
		return `${this.withPadding(this.hours)}:${this.withPadding(this.minutes)}`;
	}

	to12String() {
		const hour = this.hours % 12 || 12;
		const p = this.toP();
		return `${this.withPadding(hour)}:${this.withPadding(this.minutes)} ${p}`;
	}
}

