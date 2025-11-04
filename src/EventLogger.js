function EventLogger(batchInterval = 2000, uploadFn, timeoutTimer = 2000) {
    let events = [];
    let isUploading = false;

    function log(event) {
        events.push({event, timeStamp: Date.now()})
    }

    async function flush() {
        if (isUploading || events.length === 0) {
            return;
        }

        isUploading = true
        const batch = [...events];
        events = [];

        const controller = new AbortController();
        const abortTimeOut = setTimeout(()=> controller.abort, timeoutTimer)

        try {
            uploadFn(batch, controller.signal)
        } catch (error) {
            events = [...batch, ...events]
        } finally {
            clearTimeout(abortTimeOut)
            isUploading = false
        }
    }

    const timer = setInterval(flush, batchInterval)

    function stop() {
        clearInterval(timer)
    }

    return {log, flush, stop}
}

export default EventLogger;