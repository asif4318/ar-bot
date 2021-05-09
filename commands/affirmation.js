const axios = require('axios');

module.exports = {
    name: 'affirmation',
    description: 'Fetches an affirmation',
    async execute(message) {
        let getAffirmation = async () => {
            let response = await axios.get(
                'https://www.affirmations.dev/'
            );
            let affirmation = response.data.affirmation;
            return affirmation;
        };

        let affirmationValue = await getAffirmation();
        //console.log(affirmationValue);
        message.channel.send(affirmationValue);
    },
};
