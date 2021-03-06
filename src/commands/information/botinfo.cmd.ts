import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment from "moment-timezone";
import simplur from "simplur";
import prettyms from "pretty-ms";
export const command = new Command(
	"botinfo",
	"Gets info about the bot.",
	["info"],
	["bi"],
	[] as const,
	permissions.everyone
).setExec(async(client, message, args, lang) => {
	const { versions } = process;
	const embed = new client.Embed()
		.setTitle("Bot Info")
		.setColor(client.Colors.GRAY)
		.setDescription("Information about the bot!")
		.setThumbnail(client.user?.avatarURL({ format: "png" }) ?? "")
		.addField("User Tag", client.user?.tag ?? "Not Found", true)
		.addField("ID", client.user?.id ?? "Not Found", true)
		.addField("Version", `v${client.version}`)
		.addField("Node.JS Version", process.version)
		.addField("Discord.JS Version", client.Discord.version, true)
		.addField("V8 Version", versions.v8, true)
		.addField("OpenSSL Version", versions.openssl, true)
		.addField("Users", client.users.cache.size, true)
		.addField("Channels", client.channels.cache.size, true)
		.addField("Guilds", client.guilds.cache.size, true)
		.addField("Uptime", prettyms(client.uptime ?? 0, { unitCount: 3, verbose: true }), true)
		.setFooter(`If you would like to request deletion of your data, DM ${client.users.cache.get("413143886702313472")?.tag}`);
	await message.channel.send(embed);
});
