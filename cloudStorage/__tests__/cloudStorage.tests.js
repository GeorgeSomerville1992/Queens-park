import CloudStorage from "../cloudStorage";
// import CloudStorageInterface from "../cloudStorageInterface";
import { describe, expect, test } from "@jest/globals";

/**
 * The test suit below includes 10 tests for Level 2.
 *
 * All have the same score.
 * You are not allowed to modify this file,
 * but feel free to read the source code
 * to better understand what is happening in every specific case.
 */
describe("Level 2 tests", () => {
	let storage;

	beforeEach(() => {
		storage = new CloudStorage();
	});

	it("Test level 2 case 01 top everywhere", () => {
		expect(storage.addFile("/file1.txt", 4)).toEqual(true);
		expect(storage.addFile("/file2.mp4", 38)).toEqual(true);
		expect(storage.addFile("/dir1/file3", 17)).toEqual(true);
		expect(storage.addFile("/dir1/file4.txt", 6)).toEqual(true);
		expect(storage.addFile("/dir1/deep_dir/file5.mkv", 40)).toEqual(true);
		expect(storage.addFile("/dir2/file6.mov", 15)).toEqual(true);

		let expected = [
			"/dir1/deep_dir/file5.mkv(40)",
			"/file2.mp4(38)",
			"/dir1/file3(17)",
		];
		expect(storage.getNLargest("/", 3)).toEqual(expected);
	});

	it("Test level 2 case 02 top in directory", () => {
		expect(storage.addFile("/file.avi", 100)).toEqual(true);
		expect(storage.addFile("/dir1/file3", 10)).toEqual(true);
		expect(storage.addFile("/dir1/file4.txt", 10)).toEqual(true);
		expect(storage.addFile("/dir1/deep_dir/file5.mp3", 30)).toEqual(true);
		expect(storage.addFile("/dir2/file6.mp4", 60)).toEqual(true);
		let expected = ["/dir1/deep_dir/file5.mp3(30)", "/dir1/file3(10)"];
		expect(storage.getNLargest("/dir1", 2)).toEqual(expected);
	});

	it("Test level 2 case 03 top in deep directory", () => {
		expect(storage.addFile("/file5.file", 90)).toEqual(true);
		expect(storage.addFile("/dir1/file4", 49)).toEqual(true);
		expect(storage.addFile("/dir1/file3.txt", 6)).toEqual(true);
		expect(storage.addFile("/dir1/deep_dir/file5_huge", 1000)).toEqual(true);
		expect(storage.addFile("/dir2/file6.mp4", 100)).toEqual(true);
		let expected = ["/dir1/deep_dir/file5_huge(1000)"];
		expect(storage.getNLargest("/dir1/deep_dir", 4)).toEqual(expected);
	});

	it("Test level 2 case 04 top check sorting", () => {
		expect(storage.addFile("/dir/file1.csv", 5)).toEqual(true);
		expect(storage.addFile("/dirfile2csv", 5)).toEqual(true);
		expect(storage.addFile("/dir/file3.txt", 5)).toEqual(true);
		let expected = [
			"/dir/file1.csv(5)",
			"/dir/file3.txt(5)",
			"/dirfile2csv(5)",
			// "/dir/file3.txt(5)",
		];

		// /dir/file3.txt
		// it wants the slash to be before the dot.

		// above is meant to be at the bottom of the list, but since all files have the same size, it can be in any order
		expect(storage.getNLargest("/dir", 3)).toEqual(expected);

		expect(storage.addFile("/dir/dir/dir/dirfile", 5)).toEqual(true);
		expected = [
			"/dir/dir/dir/dirfile(5)",
			"/dir/file1.csv(5)",
			"/dir/file3.txt(5)",
		];

		expect(storage.getNLargest("/", 3)).toEqual(expected);
		expect(storage.addFile("/dir/dir/dirfile", 5)).toEqual(true);
		expected = ["/dir/dir/dir/dirfile(5)", "/dir/dir/dirfile(5)"];
		expect(storage.getNLargest("/dir", 2)).toEqual(expected);
		expect(storage.deleteFile("/dir/dir/dir/dirfile")).toEqual(5);
		expected = [
			"/dir/dir/dirfile(5)",
			"/dir/file1.csv(5)",
			"/dir/file3.txt(5)",
			"/dirfile2csv(5)",
		];
		expect(storage.getNLargest("/dir", 5)).toEqual(expected);
	});

	it("Test level 2 case 05 top in empty directory", () => {
		expect(storage.addFile("/file2.jpg", 6)).toEqual(true);
		expect(storage.addFile("/dir1/file3", 5)).toEqual(true);
		expect(storage.addFile("/dir2/file6.mp4", 50)).toEqual(true);
		expect(storage.deleteFile("/dir2/file6.mp4")).toEqual(50);
		expect(!!storage.getNLargest("/dir2", 3).length).toEqual(false);
		expect(storage.deleteFile("/dir1/file3")).toEqual(5);
		expect(!!storage.getNLargest("/dir1", 1).length).toEqual(false);
		const expected = ["/file2.jpg(6)"];
		expect(storage.getNLargest("/", 15)).toEqual(expected);
	});

	it("Test level 2 case 06 top in unexisting direcrtory", () => {
		expect(!!storage.getNLargest("/dir3", 2).length).toEqual(false);
		expect(!!storage.getNLargest("/", 3).length).toEqual(false);
		expect(storage.addFile("/dir1/dir2/dir3/dir1/file", 100)).toEqual(true);

		expect(storage.getFileSize("/dir1/dir2/dir3/dir1/file")).toEqual(100);

		let expected = ["/dir1/dir2/dir3/dir1/file(100)"];

		expect(storage.getNLargest("/dir1", 3)).toEqual(expected);
		// since the file is in dir1, it should be found when we search for dir1, but not when we search for dir2 or dir3
		expect(!!storage.getNLargest("/dir2", 1).length).toEqual(false);

		expect(!!storage.getNLargest("/dir3", 1).length).toEqual(false);
	});

	it("Test level 2 case 07 top mixed 1", () => {
		expect(storage.addFile("/dir/file1", 7)).toEqual(true);
		expect(storage.addFile("/dir/file2", 7)).toEqual(true);
		expect(storage.addFile("/file3", 8)).toEqual(true);
		expect(storage.getFileSize("/dir/file1")).toEqual(7);
		let expected = ["/file3(8)", "/dir/file1(7)", "/dir/file2(7)"];
		expect(storage.getNLargest("/", 5)).toEqual(expected);
		expected = ["/dir/file1(7)", "/dir/file2(7)"];
		expect(storage.getNLargest("/dir", 3)).toEqual(expected);
		expect(storage.getFileSize("/dir/file2")).toEqual(7);
		expected = ["/dir/file1(7)", "/dir/file2(7)"];
		expect(storage.getNLargest("/dir", 3)).toEqual(expected);
		expect(storage.deleteFile("/dir/file1")).toEqual(7);
		expected = ["/dir/file2(7)"];
		expect(storage.getNLargest("/dir", 2)).toEqual(expected);
		expect(storage.deleteFile("/file3")).toEqual(8);
		expected = ["/dir/file2(7)"];
		expect(storage.getNLargest("/", 2)).toEqual(expected);
		expect(storage.deleteFile("/dir/file1")).toEqual(null);
		expect(storage.deleteFile("/dir/file2")).toEqual(7);
		expect(!!storage.getNLargest("/", 2).length).toEqual(false);
	});

	it("Test level 2 case 08 top mixed 2", () => {
		expect(!!storage.getNLargest("/", 4).length).toEqual(false);
		expect(storage.addFile("/dir/file.mp4", 100)).toEqual(true);
		expect(storage.getFileSize("/dir/file.mp4")).toEqual(100);
		expect(storage.addFile("/dir/file.mp4", 150)).toEqual(false);
		expect(storage.addFile("/file.mp4", 100)).toEqual(true);
		expect(storage.getFileSize("/dir/file.mp4")).toEqual(100);
		let expected = ["/dir/file.mp4(100)"];
		expect(storage.getNLargest("/", 1)).toEqual(expected);
		expected = ["/dir/file.mp4(100)", "/file.mp4(100)"];
		expect(storage.getNLargest("/", 2)).toEqual(expected);
		expected = ["/dir/file.mp4(100)", "/file.mp4(100)"];
		expect(storage.getNLargest("/", 3)).toEqual(expected);
		expect(storage.addFile("/dirfile.mp4", 100)).toEqual(true);
		expect(storage.addFile("/dir/library/package/exec", 1)).toEqual(true);

		expect(storage.deleteFile("/dir/file.mp4")).toEqual(100);

		expected = ["/dirfile.mp4(100)", "/dir/library/package/exec(1)"];

		expect(storage.getNLargest("/dir", 3)).toEqual(expected);

		expected = ["/dirfile.mp4(100)", "/dir/library/package/exec(1)"];
		expect(storage.getNLargest("/dir", 2)).toEqual(expected);

		expected = ["/dirfile.mp4(100)"];
		expect(storage.getNLargest("/dir", 1)).toEqual(expected);

		expected = [
			// "/file.mp4(100)", meant to be here apparently
			"/dirfile.mp4(100)",
			"/file.mp4(100)",
			"/dir/library/package/exec(1)",
		];

		expect(storage.getNLargest("/", 10)).toEqual(expected);
	});

	it("Test level 2 case 09 top mixed 3", () => {
		expect(storage.addFile("/lib/bin/exec.sh", 34)).toEqual(true);
		expect(storage.addFile("/lib/bin/py3", 78)).toEqual(true);
		expect(storage.addFile("/lib/bin/py3.9", 79)).toEqual(true);
		expect(storage.addFile("/lib/bin/python3", 78)).toEqual(true);
		expect(storage.addFile("/lib/bin/python3.9", 79)).toEqual(true);
		expect(storage.addFile("/lib/bin/python2", 50)).toEqual(true);
		expect(storage.deleteFile("/lib/bin/py3")).toEqual(78);
		let expected = [
			"/lib/bin/py3.9(79)",
			"/lib/bin/python3.9(79)",
			"/lib/bin/python3(78)",
			"/lib/bin/python2(50)",
			"/lib/bin/exec.sh(34)",
		];
		expect(storage.getNLargest("/", 10)).toEqual(expected);
		expect(storage.addFile("/lib/bin/exec.sh", 60)).toEqual(false);
		expect(storage.addFile("/lib/bin/exec.sh", 300)).toEqual(false);
		expect(storage.addFile("/lib/exec/exec.sh", 300)).toEqual(true);
		expected = [
			"/lib/bin/py3.9(79)",
			"/lib/bin/python3.9(79)",
			"/lib/bin/python3(78)",
			"/lib/bin/python2(50)",
		];
		expect(storage.getNLargest("/lib/bin", 4)).toEqual(expected);
		expect(!!storage.getNLargest("/lib/bingo", 9).length).toEqual(false);
		expected = [
			"/lib/bin/py3.9(79)",
			"/lib/bin/python3.9(79)",
			"/lib/bin/python3(78)",
			"/lib/bin/python2(50)",
			"/lib/bin/exec.sh(34)",
		];
		expect(storage.getNLargest("/lib/bi", 9)).toEqual(expected);
		expected = [
			"/lib/exec/exec.sh(300)",
			"/lib/bin/py3.9(79)",
			"/lib/bin/python3.9(79)",
			"/lib/bin/python3(78)",
		];
		expect(storage.getNLargest("/lib", 4)).toEqual(expected);
		expect(storage.deleteFile("/lib/bin/py3")).toEqual(null);
		expect(storage.getFileSize("/lib/bin/exec.sh")).toEqual(34);
		expect(storage.getFileSize("/exec.sh")).toEqual(null);
		expect(storage.getFileSize("/lib/exec/exec.sh")).toEqual(300);
		expect(storage.getFileSize("/library/exec/exec.sh")).toEqual(null);
		expect(storage.deleteFile("/lib/bin/py3")).toEqual(null);
		expected = [
			"/lib/exec/exec.sh(300)",
			"/lib/bin/py3.9(79)",
			"/lib/bin/python3.9(79)",
			"/lib/bin/python3(78)",
			"/lib/bin/python2(50)",
		];
		expect(storage.getNLargest("/", 5)).toEqual(expected);
		expected = [
			"/lib/exec/exec.sh(300)",
			"/lib/bin/py3.9(79)",
			"/lib/bin/python3.9(79)",
			"/lib/bin/python3(78)",
			"/lib/bin/python2(50)",
			"/lib/bin/exec.sh(34)",
		];
		expect(storage.getNLargest("/lib", 6)).toEqual(expected);
		expected = ["/lib/exec/exec.sh(300)"];
		expect(storage.getNLargest("/lib/exec", 2)).toEqual(expected);
	});

	it("Test level 2 case 10 top mixed 4", () => {
		expect(storage.addFile("/index.html", 252)).toEqual(true);
		expect(storage.addFile("/collection/images/filename", 106)).toEqual(true);
		expect(storage.addFile("/trash/img.img", 18)).toEqual(true);
		expect(storage.addFile("/library/bin/containers/filename", 43)).toEqual(
			true,
		);
		expect(
			storage.addFile("/library/bin/containers/video3435.mp4", 146),
		).toEqual(true);
		expect(storage.addFile("/collection/video3435.mp4", 84)).toEqual(true);
		expect(storage.addFile("/trash/filename", 12)).toEqual(true);
		expect(storage.addFile("/collection/img.img", 113)).toEqual(true);
		expect(storage.addFile("/trash/img.img", 29)).toEqual(false);
		expect(storage.addFile("/library/main.cpp", 154)).toEqual(true);
		expect(storage.addFile("/collection/pic_pic.png", 172)).toEqual(true);
		expect(storage.addFile("/trash/script.js", 79)).toEqual(true);
		expect(storage.addFile("/video3435.mp4", 285)).toEqual(true);
		expect(storage.addFile("/collection/images/pic_pic.png", 85)).toEqual(true);
		expect(storage.addFile("/collection/images/filename", 65)).toEqual(false);
		expect(storage.addFile("/trash/exec.exec", 177)).toEqual(true);
		expect(storage.addFile("/library/bin/containers/filename", 27)).toEqual(
			false,
		);
		expect(storage.addFile("/collection/audio/img.img", 224)).toEqual(true);
		expect(storage.addFile("/library/bin/packages/pic_pic.png", 42)).toEqual(
			true,
		);
		expect(storage.addFile("/library/bin/video3435.mp4", 2)).toEqual(true);
		let expected = [
			"/collection/audio/img.img(224)",
			"/collection/pic_pic.png(172)",
			"/collection/img.img(113)",
			"/collection/images/filename(106)",
			"/collection/images/pic_pic.png(85)",
			"/collection/video3435.mp4(84)",
		];
		expect(storage.getNLargest("/collection", 13)).toEqual(expected);
		expected = [
			"/library/main.cpp(154)",
			"/library/bin/containers/video3435.mp4(146)",
			"/library/bin/containers/filename(43)",
			"/library/bin/packages/pic_pic.png(42)",
			"/library/bin/video3435.mp4(2)",
		];
		expect(storage.getNLargest("/library", 17)).toEqual(expected);
		expected = [
			"/video3435.mp4(285)",
			"/index.html(252)",
			"/collection/audio/img.img(224)",
			"/trash/exec.exec(177)",
			"/collection/pic_pic.png(172)",
			"/library/main.cpp(154)",
		];
		expect(storage.getNLargest("/", 6)).toEqual(expected);
		expected = [
			"/video3435.mp4(285)",
			"/index.html(252)",
			"/collection/audio/img.img(224)",
			"/trash/exec.exec(177)",
			"/collection/pic_pic.png(172)",
			"/library/main.cpp(154)",
			"/library/bin/containers/video3435.mp4(146)",
			"/collection/img.img(113)",
			"/collection/images/filename(106)",
			"/collection/images/pic_pic.png(85)",
			"/collection/video3435.mp4(84)",
			"/trash/script.js(79)",
			"/library/bin/containers/filename(43)",
			"/library/bin/packages/pic_pic.png(42)",
			"/trash/img.img(18)",
		];
		expect(storage.getNLargest("/", 15)).toEqual(expected);
		expected = ["/collection/audio/img.img(224)"];
		expect(storage.getNLargest("/collection", 1)).toEqual(expected);
		expected = [
			"/video3435.mp4(285)",
			"/index.html(252)",
			"/collection/audio/img.img(224)",
			"/trash/exec.exec(177)",
			"/collection/pic_pic.png(172)",
			"/library/main.cpp(154)",
			"/library/bin/containers/video3435.mp4(146)",
			"/collection/img.img(113)",
			"/collection/images/filename(106)",
			"/collection/images/pic_pic.png(85)",
			"/collection/video3435.mp4(84)",
			"/trash/script.js(79)",
			"/library/bin/containers/filename(43)",
			"/library/bin/packages/pic_pic.png(42)",
			"/trash/img.img(18)",
			"/trash/filename(12)",
			"/library/bin/video3435.mp4(2)",
		];
		expect(storage.getNLargest("/", 19)).toEqual(expected);
	});
});
