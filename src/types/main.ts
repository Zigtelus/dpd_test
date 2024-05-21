interface IRegistered {
	age : number;
	date: string;
};

interface IPicture {
	large    : string;
	medium   : string;
	thumbnail: string;
};

interface IName {
	first: string;
	last : string;
	title: string;
};

interface ILogin {
	md5     : string;
	password: string;
	salt    : string;
	sha1    : string;
	sha256  : string;
	username: string;
	uuid    : string;
};

interface ILocation {
	country: string;
};

interface IId {
	name : string;
	value: string;
};

interface IDob {
	age : number;
	date: string;
};

interface IUser {
	phone     : string;
	nat       : string;
	gender    : 'male' | 'female';
	email     : string;
	registered: IRegistered;
	picture   : IPicture;
	name      : IName;
	login     : ILogin;
	location  : ILocation;
	id        : IId;
	dob       : IDob;
};

export type {
	IRegistered,
	IPicture,
	IName,
	ILogin,
	ILocation,
	IId,
	IDob,
	IUser,
}