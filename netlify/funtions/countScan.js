let scanCount = 0;

exports.handler = async function (event, context) {
    scanCount += 1;
    return {
        statusCode: 200,
        body: JSON.stringify({ scanCount }),
    };
};
