const { Client } = require('discord.js');

module.exports = class MenuDocsClient extends Client {
  constructor(options = {}) {
    super({
      disableMentions: "everyone"
    });
    this.validate(options);

    this.once("ready", () => {
      console.log(`Logged In As ${this.user.username}!`)
    });

    this.on('message', async (message) => {
      const mentionRegex = RegExp(`^<@!${this.user.id}>$`)
      const mentionRegexPrefix = RegExp(`^<@!${this.user.id}> `)

      if(!message.guild || message.author.bot) return;
      if(message.content.match(mentionRegex)) message.channel.send(`My prefix for ${message.guild.name} is \`${this.prefix}\``);

      const prefix = message.content.match(mentionRegexPrefix) ?
        message.content.match(mentionRegexPrefix)[0] : this.prefix;

      // eslint-disable-next-Line no-unused-vars
      const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

      if(message.content.toLowerCase() === 'hello') {
        message.channel.send("Hewo dawwy UwU");
      }
    });
  }

  validate(options) {
    if(typeof options !== 'object') throw new TypeError(`Options should be a type of object`);

    if(!options.token) throw new Error(`Tokens Must Be Passed`);
    this.token = options.token

    if(!options.prefix) throw new Error(`Prefix Must Be Passed`);
    if(typeof options.prefix !== 'string') throw new TypeError(`Prefix Must Be A String`);
    this.prefix = options.prefix
  }

  async login(token = this.token) {
    super.login(token);
  }
}
