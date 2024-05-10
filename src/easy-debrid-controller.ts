import { Request, Response } from "express";
import { EasyDebridService } from "./easy-debrid-service";

export class EasyDebridController {
  private readonly easyDebridService: EasyDebridService;

  constructor(easyDebridService: EasyDebridService) {
    this.easyDebridService = easyDebridService;
  }

  async getAccountInfo(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      const userDetails = await this.easyDebridService.getAccountInfo(
        // accessToken
      );
      res.json(userDetails);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async submitCoupon(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      const coupon = req.body.coupon;
      const result = await this.easyDebridService.submitCoupon(
        // accessToken,
        coupon
      );
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async linkLookup(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      const urls = req.body.urls;
      const response = await this.easyDebridService.linkLookup(
        // accessToken,
        urls
      );
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async generateDebridLink(req: Request, res: Response) {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      const url = req.body.url;
      const response = await this.easyDebridService.generateDebridLink(
        // accessToken,
        url
      );
      res.json(response);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
