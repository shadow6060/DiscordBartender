import { Command } from "../../structures/command.struct";
import { permissions } from "../../modules/permissions";
import { GuildMember, EmbedField, Util } from "discord.js";
import { transpile } from "typescript";
export const command = new Command("eval", "Eval code.", [], [], [{ name: "code", type: String, required: true }], permissions.admin)
	.setExec(async (client, message, args, lang) => {
		const transpiled: string = transpile(client.constants.eval.format(args.code));
		const evaled: any | Error = await (async () => {
			try {
				return eval(transpiled);
			} catch (err) {
				return err;
			}
		})()
		const type: string = (evaled === undefined || evaled === null) ? String(evaled) : evaled.constructor.name;
		for (const text of Util.splitMessage(`**RESULT:**\n\`\`\`js\n${client.inspect(evaled, false)}\n\`\`\`\n**TYPE:**\n\`\`\`js\n${type}\n\`\`\``, { append: "\n```", prepend: "```js\n" })) {
			await message.channel.send(text);
		}
	});