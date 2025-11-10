describe("ItemRepo (unit)", () => {
  function freshRepo() {
    let ItemRepo: any;
    jest.isolateModules(() => {
      ItemRepo = require("../../../src/repositories/inMemoryItemRepo").ItemRepo;
    });
    return ItemRepo;
  }

  describe("create()", () => {
    it("gera id e datas, e aparece no all()", () => {
      const repo = freshRepo();
      const created = repo.create("Caderno", 3);

      expect(created.id).toBeDefined();

      const all = repo.all();
      expect(all.find((i:any) => i.id === created.id)).toBeTruthy();
    });
  });

  describe("findById()", () => {
    it("retorna undefined quando não existe", () => {
      const repo = freshRepo();
      expect(repo.findById("nope")).toBeUndefined();
    });
  });

  describe("update()", () => {
    it("atualiza campos", () => {
      const repo = freshRepo();
      const item = repo.create("Pen", 1);

      const updated = repo.update(item.id, { quantity: 5 });
      expect(updated.quantity).toBe(5);
    });
  });

  describe("remove()", () => {
    it("remove item e retorna true", () => {
      const repo = freshRepo();
      const item = repo.create("Teste", 2);

      expect(repo.remove(item.id)).toBe(true);
    });

    it("retorna false quando id não existe", () => {
      const repo = freshRepo();
      expect(repo.remove("nope")).toBe(false);
    });
  });
});
