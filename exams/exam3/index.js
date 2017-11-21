const NewsFeedModule = (function () {
	let newsFeed;
	return {
		getInstance: function () {
			if (!newsFeed) {
				newsFeed = {
					_articles: [],
					_isBusy: false,

					init(articles) {
						if (arguments.length !== 0 && articles instanceof Array &&
							articles.every((elem) => {
								return 'title' in elem && 'content' in elem;
							})
						) {
							this._articles = articles.slice();
						} else {
							return false;
						}
					},
					addArticle(article, cb) {
						if (this._isBusy === true) {
							return false;
						}
						if (!(article instanceof Object) || !('title' in article) || !('content' in article)) {
							this._isBusy = false;
							return false;
						} else {
							this._isBusy = true;
							setTimeout(() => {
								this._articles.push(article);
								this._isBusy = false;
								cb();
							});
						}
					},
					removeArticle(article, cb) {
						if (this._isBusy === true) {
							return false;
						}
						if (!(article instanceof Object) || !('title' in article) || !('content' in article)) {
							this._isBusy = false;
							return false;
						} else {
							this._isBusy = true;
							setTimeout(() => {
								let result = null;
								let index = this._articles.indexOf(article);
								if (index !== -1) {
									result = this._articles[index];
									this._articles.splice(index, 1);
								}
								this._isBusy = false;
								cb(result);
							});
						}
					},
					find(functor, cb) {
						if (this._isBusy === true) {
							return false;
						}
						if (!(functor instanceof Function)) {
							this._isBusy = false;
							return false;
						} else {
							this._isBusy = true;
							setTimeout(() => {
								let result = null;
								for (let i = 0; i < this._articles.length; i++) {
									if (functor(this._articles[i])) {
										result = this._articles[i];
										break;
									}
								}
								this._isBusy = false;
								cb(result);
							});
						}
					},
					query(queryString) {
					}

				}
			}
			return newsFeed;
		}
	}
})();

module.exports = {
	firstName: 'Alexandr',
	lastName: 'Kazmin',
	task: NewsFeedModule
};