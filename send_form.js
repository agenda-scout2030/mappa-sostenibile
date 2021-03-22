const data = {
    'entry.283790894': 'javawork',
    'draftResponse': [],
    'pageHistory': 0
};

$.ajax({
    type: "POST",
    url: 'https://docs.google.com/forms/d/e/1FAIpQLSc5GJ6YvSDQZW1m6haJVBBlUKZQacpiTzA1-XWaIgfafH9fLQ/formResponse',
    data: data,
    success: function (data) {
        console.log(data);
    },
});
