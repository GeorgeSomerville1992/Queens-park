// import CloudStorageInterface from './cloudStorageInterface';

export default class CloudStorage {
	constructor() {
		this.files = [];
	}

	addFile(name, size) {
		const existingFile = this.files.find((file) => file.name === name);
		if (existingFile) {
			return false;
		}
		this.files.push({ name, size });
		return true;
	}

	getFileSize(name) {
		const existingFile = this.files.find((file) => file.name === name);
		if (existingFile) {
			return existingFile.size;
		} else return null;
	}

	deleteFile(name) {
		const existingFile = this.files.find((file) => file.name === name);
		if (existingFile) {
			this.files.splice(this.files.indexOf(existingFile), 1);
			return existingFile.size;
		}
		return null;
	}

	getNLargest(prefix, n) {
		const foundFilesViaPrefix = this.files
			.filter((file) => {
				console.log(
					"where in the index is the prefix -->",
					file.name.indexOf(prefix),
				);
				return file.name.includes(prefix) && file.name.indexOf(prefix) === 0;
			})
			.sort((a, b) => {
				// not taking into account the slash
				return b.size - a.size;
			});
		console.log("foundFilesViaPrefix before -->", foundFilesViaPrefix);
		if (
			foundFilesViaPrefix.every(
				(file) => file.size === foundFilesViaPrefix[0].size,
			)
		) {
			foundFilesViaPrefix.sort((a, b) => {
				return a.name.localeCompare(b.name);
			});
		}

		// check if some values have the same size, if they do, sort them by name

		const arraySizesMap = foundFilesViaPrefix.map((file) => file.size);
		const hasDuplicates = (arraySizesMap) =>
			arraySizesMap.length !== new Set(arraySizesMap).size;
		console.log("hasDuplicates -->", hasDuplicates(arraySizesMap));
		// explain this!all tests pass!!!
		if (hasDuplicates(arraySizesMap)) {
			foundFilesViaPrefix
				.sort((a, b) => {
					return a.name.localeCompare(b.name);
				})
				.sort((a, b) => {
					return b.size - a.size;
				});
		}

		console.log(
			"foundFilesViaPrefix -->",
			foundFilesViaPrefix,
			foundFilesViaPrefix.every(
				(file) => file.size === foundFilesViaPrefix[0].size,
			),
			foundFilesViaPrefix.some(
				(file) => file.size === foundFilesViaPrefix[0].size,
			),
		);
		if (!foundFilesViaPrefix.length) {
			return [];
		}

		if (n > foundFilesViaPrefix.length) {
			// console.log(
			// 	"oooooo",
			// 	foundFilesViaPrefix.map((file) => `${file.name}(${file.size})`),
			// );

			return foundFilesViaPrefix.map((file) => `${file.name}(${file.size})`);
		} else {
			// console.log('foundFilesViaPrefix -->', foundFilesViaPrefix);
			const foundFilesViaPrefixCopy = [...foundFilesViaPrefix].splice(0, n);

			return foundFilesViaPrefixCopy.map(
				(file) => `${file.name}(${file.size})`,
			);
			console.log("copy", foundFilesViaPrefixCopy);
		}

		console.log("files -->", foundFilesViaPrefix);
	}

	// TODO: implement interface methods here
}
