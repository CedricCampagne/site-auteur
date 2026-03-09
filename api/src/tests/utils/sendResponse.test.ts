import { sendResponse } from "../../utils/sendResponse";
import type { Response } from "express";

describe("sendResponse", ()=>{
    it("doit renvoyer status success et le json correspondant", ()=>{
        // mock de res
        // Creer un faux objet res qui imite celui de Express
        // jest.fn() fausse fonction fait rine mais enregistre les appels
        // .mockReturnThis() fait que res.status() renvoie res
        // json: jest.fn() Elle enregistre :si elle a été appelée et avec quels arguments
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        sendResponse(res, 200, "success", "OK", { id: 1 });

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            type: "success",
            message: "OK",
            data: { id: 1 }
        });
    });

    it("doit renvoyer status fail et le mesage et pas de data", () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        sendResponse(res, 400, "fail", "Bad request");

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            type: "fail",
            message: "Bad request"
        });
    });

    it("doit renvoyer success sans data", () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        sendResponse(res, 200, "success", "ok");

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            type: "success",
            message: "ok"
        });
    });

    it("ne doit pas inclure data quand elle vaut undefined", () => {
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        } as unknown as Response;

        sendResponse(res, 200, "success", "ok", undefined);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            type: "success",
            message: "ok"
        });
    });

});