const escapeRegExp = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

const replaceAll = (str, term, replacement) => {
  return str.replace(new RegExp(escapeRegExp(term), 'g'), replacement);
}

module.exports = {replaceAll};