/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function redirectToSPA(location, pathSegmentsToKeep) {
    return (
        location.protocol +
        '//' +
        location.hostname +
        (location.port ? ':' + location.port : '') +
        location.pathname
            .split('/')
            .slice(0, 1 + pathSegmentsToKeep)
            .join('/') +
        '/?/' +
        location.pathname
            .slice(1)
            .split('/')
            .slice(pathSegmentsToKeep)
            .join('/')
            .replace(/&/g, '~and~') +
        (location.search ? '&' + location.search.slice(1).replace(/&/g, '~and~') : '') +
        location.hash
    );
}
