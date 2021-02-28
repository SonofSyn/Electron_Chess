export async function forEachAsync<A>(data: A[], fnc: (a: A) => Promise<void>) {
    for (let command of data) {
        await fnc(command)
    }

}