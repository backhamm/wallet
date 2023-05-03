interface objType {
    [key: string]: any;
}
const langObj: objType = {
    zh: require.context('./zh', true, /.ts$/),
    en: require.context('./en', true, /.ts$/),
    ko: require.context('./ko', true, /.ts$/),
};
const resources: objType = {};

function requireFun(type: string): objType {
    const modules: objType = {};
    const files: any = langObj[type];

    files
        .keys()
        .filter((el: string) => {
            return ['index', 'locales'].every(
                (key: string) => !el.includes(key),
            );
        })
        .forEach((el: string) => {
            const moduleName: string = el.replace(/^.\/(.*)\.ts/, '$1');
            modules[moduleName] = files(el).default;
        });
    return modules;
}

Object.keys(langObj).forEach((el: string) => {
    resources[el] = { translation: requireFun(el) };
});

export default resources;
