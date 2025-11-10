import type { Request, Response } from "express";

jest.mock("../../../src/repositories/inMemoryItemRepo", () => ({
  ItemRepo: {
    all: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  }
}));

import { ItemRepo } from "../../../src/repositories/inMemoryItemRepo";
import { ItemsController } from "../../../src/controllers/items.controller";

function mockRes() {
  const res = {} as Response;
  res.status = jest.fn().mockReturnValue(res) as any;
  res.json = jest.fn().mockReturnValue(res) as any;
  res.send = jest.fn().mockReturnValue(res) as any;
  return res;
}

describe("ItemsController (unit)", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("list()", () => {
    it("retorna todos os itens", () => {
      (ItemRepo.all as jest.Mock).mockReturnValue([{ id: "1", name: "X", quantity: 1 }]);

      const req = {} as Request;
      const res = mockRes();

      ItemsController.list(req, res);

      expect(res.json).toHaveBeenCalledWith([{ id: "1", name: "X", quantity: 1 }]);
    });
  });

  describe("get()", () => {
    it("retorna 404 quando não existe", () => {
      (ItemRepo.findById as jest.Mock).mockReturnValue(undefined);

      const req = { params: { id: "bad" } } as unknown as Request;
      const res = mockRes();

      ItemsController.get(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Item não encontrado" });
    });

    it("retorna item quando existe", () => {
      const item = { id: "1", name: "Ok", quantity: 2 };
      (ItemRepo.findById as jest.Mock).mockReturnValue(item);

      const req = { params: { id: "1" } } as unknown as Request;
      const res = mockRes();

      ItemsController.get(req, res);

      expect(res.json).toHaveBeenCalledWith(item);
    });
  });

  describe("create()", () => {
    it("retorna 400 para payload inválido", () => {
      const req = { body: { name: "", quantity: -1 } } as unknown as Request;
      const res = mockRes();

      ItemsController.create(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("cria item com sucesso", () => {
      const created = { id: "ok", name: "Novo", quantity: 3 };
      (ItemRepo.create as jest.Mock).mockReturnValue(created);

      const req = { body: { name: "Novo", quantity: 3 } } as unknown as Request;
      const res = mockRes();

      ItemsController.create(req, res);

      expect(ItemRepo.create).toHaveBeenCalledWith("Novo", 3);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith(created);
    });
  });

  describe("update()", () => {
    it("retorna 400 para payload inválido", () => {
      const req = { params: { id: "1" }, body: { quantity: -5 } } as unknown as Request;
      const res = mockRes();

      ItemsController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
    });

    it("retorna 404 quando não existe", () => {
      (ItemRepo.update as jest.Mock).mockReturnValue(undefined);

      const req = { params: { id: "x" }, body: { name: "A" } } as unknown as Request;
      const res = mockRes();

      ItemsController.update(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Item não encontrado" });
    });

    it("atualiza com sucesso", () => {
      const updated = { id: "1", name: "Novo", quantity: 7 };
      (ItemRepo.update as jest.Mock).mockReturnValue(updated);

      const req = { params: { id: "1" }, body: { name: "Novo", quantity: 7 } } as unknown as Request;
      const res = mockRes();

      ItemsController.update(req, res);

      expect(res.json).toHaveBeenCalledWith(updated);
    });
  });

  describe("remove()", () => {
    it("retorna 404 quando item não existe", () => {
      (ItemRepo.remove as jest.Mock).mockReturnValue(false);

      const req = { params: { id: "bad" } } as unknown as Request;
      const res = mockRes();

      ItemsController.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Item não encontrado" });
    });

    it("remove com sucesso", () => {
      (ItemRepo.remove as jest.Mock).mockReturnValue(true);

      const req = { params: { id: "1" } } as unknown as Request;
      const res = mockRes();

      ItemsController.remove(req, res);

      expect(res.status).toHaveBeenCalledWith(204);
      expect(res.send).toHaveBeenCalled();
    });
  });

});
