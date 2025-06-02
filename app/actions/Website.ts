"use server"
import { authOptions } from "@/lib/authOptions"
import { getServerSession } from "next-auth"
import { appUrl } from "@/utils/constants"
import crypto from "crypto"
import * as cheerio from "cheerio"
import axios from "axios"
import UsersDb from "@/db/user";
import WebsitesDb from "@/db/websites";
import VisitorsDataDb from "@/db/visitordata"

async function getFavicon(domain: string) {
   const { data } = await axios.get(`https://${domain}`);
   const $ = cheerio.load(data);
   const icon = $('link[rel~="icon"]').attr('href');
   return new URL(icon!, `https://${domain}`).href;
}

export async function addUserWebsite (domain: string): Promise<boolean> {
   try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return false;

      const user: any | null = await UsersDb.findOne({ email: session.user.email });
      if (!user) return false;

      const websiteId = `website-${user.email.substring(0,4)}-${crypto.randomUUID()}`;
      const websiteFavicon = await getFavicon(domain);

      user.websites.push(websiteId);
      await user.save();

      await WebsitesDb.create({
         websiteId: websiteId,
         domain: domain,
         userid: user.userid,
         favicon: websiteFavicon || `${appUrl}/icons/web.png`
      })
      return true;
   } catch (e) {
      return false
   }
}

export async function getVisitorDataForWebsite (websiteId: string): Promise<VisitorData[] | false> {
   try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return false;

      const websiteVisitorsData: VisitorData[] | null = await VisitorsDataDb.find({ websiteId: websiteId });
      if (!websiteVisitorsData) return false;

      return websiteVisitorsData;
   } catch (e) {
      return false;
   }
}

export async function deleteUserWebsite (websiteId: string): Promise<boolean> {
   try {
      const session = await getServerSession(authOptions);
      if (!session?.user) return false;

      const user: any | null = await UsersDb.findOne({ email: session.user.email });
      if (!user) return false;

      user.websites = [ ...user.websites.filter((website: any) => website !== websiteId) ]
      await user.save();
      await WebsitesDb.deleteOne({ websiteId: websiteId, userId: user.userid });
      await VisitorsDataDb.deleteMany({ websiteId: websiteId });
      return true;
   } catch (e) {
      return false
   }
}