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
                        if (this._isBusy === true) {
                            return false;
                        }

                        this._isBusy = true;

						//remove all special symbols from query string
						queryString = queryString.replace(/[\.,-\/#!$%\^&\*;:{}=\-_`~()\+]/g, "");
						//get array of unique words from query string
						let uniqeWords = queryString.split(' ').filter((currentItem, i, allItems) => {
                            return (i === allItems.indexOf(currentItem));
                        });

						let result = [];
						for (let i = 0; i < uniqeWords.length; i++) {
							//regexp for matching all complete word to find word
							let findReg = new RegExp('\\b' + uniqeWords[i] + '\\b', 'gi');
							/*let findReg = RegExp('(^|[\\s,!?\\.\\)\\("])' + uniqeWords[i]
								+ '(?=[\\s,\\.!?\\)\\("]|$)', 'gi');*/

							for (let j = 0; j < this._articles.length; j++) {
								//count of matching in title and content
								let count = (this._articles[j]['title'].match(findReg) || []).length +
									(this._articles[j]['content'].match(findReg) || []).length;

								/*if matches exists add this object to array with match count,
								if this is the next word and there is a previous match summaraize it*/
								if (count) {
									if (result[j]) {
										result[j][1] += count;
									} else {
										result[j] = [this._articles[j], count];
									}
								}

							}

						}

						this._isBusy = false;
						//sorting result array by match cound and return without it
						return result.sort((e1, e2) => {
							return e2[1] - e1[1];
						})
							.map((e) => {
								return e[0]
							});
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