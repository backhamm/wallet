export function componentWrapper<C, E extends {}>(
    Component: C,
    displayName: string,
    extra?: E,
): C & E & { displayName?: string };
export function componentWrapper<C, E extends {}>(
    Component: C,
    extra: E,
): C & E;
export function componentWrapper<C, E extends {}>(
    Component: C,
    params: string | E,
    extra?: E,
) {
    const Comp = Component as C & E & { displayName?: string };

    if (typeof params === 'string') {
        Comp.displayName = params;
        extra &&
            Object.keys(extra).length &&
            Object.keys(extra).forEach((key) => {
                Comp[key] = extra[key];
            });
    } else {
        Object.keys(params).forEach((key) => {
            Comp[key] = params[key];
        });
    }

    return Comp;
}
