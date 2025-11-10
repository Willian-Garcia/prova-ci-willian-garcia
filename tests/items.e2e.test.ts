import request from "supertest";
import app from "../src/app";

describe("CRUD /api/items", () => {
  
  describe("saúde do app", () => {
    it("responde com status ok", async () => {
      const res = await request(app).get("/health");

      expect(res.status).toBe(200);
      expect(res.body.status).toBe("ok");
    });
  });

  describe("fluxo CRUD completo", () => {
    it("cria, lista, atualiza e remove um item", async () => {
      const createRes = await request(app)
        .post("/api/items")
        .send({ name: "Teclado", quantity: 5 });

      expect(createRes.status).toBe(201);
      const created = createRes.body;

      const listRes = await request(app).get("/api/items");
      expect(listRes.status).toBe(200);
      expect(listRes.body.find((i: any) => i.id === created.id)).toBeTruthy();

      const updRes = await request(app)
        .put(`/api/items/${created.id}`)
        .send({ quantity: 7 });

      expect(updRes.status).toBe(200);
      expect(updRes.body.quantity).toBe(7);

      const getRes = await request(app).get(`/api/items/${created.id}`);
      expect(getRes.status).toBe(200);

      const delRes = await request(app).delete(`/api/items/${created.id}`);
      expect(delRes.status).toBe(204);

      const get404 = await request(app).get(`/api/items/${created.id}`);
      expect(get404.status).toBe(404);
    });
  });

  describe("validação de payload", () => {
    it("retorna erro para payload inválido no create/update", async () => {
      const badCreate = await request(app)
        .post("/api/items")
        .send({ name: "", quantity: -1 });

      expect(badCreate.status).toBe(400);

      const okCreate = await request(app)
        .post("/api/items")
        .send({ name: "Mouse", quantity: 1 });

      const id = okCreate.body.id;

      const badUpdate = await request(app)
        .put(`/api/items/${id}`)
        .send({ quantity: -10 });

      expect(badUpdate.status).toBe(400);
    });
  });
});
