import { EmbedField, GuildMember } from "discord.js";
import { permissions } from "../../modules/permissions";
import { Command } from "@db-struct/command.struct";
import moment = require("moment-timezone");
import { Status } from "@db-module/sql";
export const command = new Command("claim", "Claim an order.", [], ["cl"], [{ name: "order", type: Command.ORDER({ filter: order => order.status === Status.UNPREPARED, silent: true }) }] as const, permissions.staff)
	.setExec(async(client, message, args, lang) => {
		if (await client.getClaimedOrder(message.author.id)) return message.channel.send(lang.commands.claim.exists);
		const { order } = args;
		if (!order) return;
		if (order.user === message.author.id) return message.channel.send(lang.commands.claim.own);
		order.metadata.claimer = message.author.id;
		order.status = Status.PREPARING;
		await order.save();
		await message.channel.send(lang.commands.claim.success.format(order.id));
	});
