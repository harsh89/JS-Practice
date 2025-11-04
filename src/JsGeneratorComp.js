const JsGeneratorComp = () => {
    // function* generatorFunction() {
    //     try {
    //         yield 'Neo'
    //         yield 'Trinity'
    //         yield 'Morpheus'
    //     } catch(err) {
    //         console.log(err)
    //     }
    //     return 'The Oracle'
    // }

    // const generator = generatorFunction();

    // console.log(generator.next())
    // generator.return('there is no spoon')
    // generator.throw(new Error('Agent Smith'))

    function* delegate() {
        yield 3
        yield 4
    }

    function* begin() {
        yield 1
        yield 2
        yield* delegate()
    }

    const generator = begin()

    for(const value of generator) {
        console.log(value)
    }

    function* fibonacci() {
        let prev = 0
        let next = 1
        yield prev
        yield next

        while(true) {
            const newVal = next + prev;
            yield newVal

            prev = next
            next = newVal
        }
    }

    const fibGen = fibonacci()
    console.log(fibGen.next().value)

    function* generatorFunc() {
        console.log(yield)
        console.log(yield)

        return 'the end'
    }

    const generator2 = generatorFunc()

    generator2.next()
    generator2.next(100)
    generator2.next(200)

    return (<div> JS Generator comp
         </div>)
}

export default JsGeneratorComp;