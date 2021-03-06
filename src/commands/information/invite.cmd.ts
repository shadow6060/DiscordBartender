import { Command } from "@db-struct/command.struct";
import { permissions } from "../../modules/permissions";
export const command = new Command(
	"invite",
	"Invite the bot to your server!",
	[],
	["ivt"],
	[] as const,
	permissions.everyone
).setExec(async(client, message, args, lang) => {
	await message.channel.send(`[yes] **Invite the bot at** <${await client.generateInvite(client.constants.permissions)}>!`);
});
