const prisma = require('../../lib/prisma');

async function listar({ pagina, limite, skip, take }) {
  const [total, dados] = await prisma.$transaction([
    prisma.boarding_pass.count(),
    prisma.boarding_pass.findMany({ orderBy: { boarding_pass_id: 'asc' }, skip, take }),
  ]);

  return { pagina, limite, total, dados };
}

function buscarPorId(id) {
  return prisma.boarding_pass.findUnique({ where: { boarding_pass_id: id }, include: { passenger: true, flight: true } });
}

async function listarDetalhes({ pagina, limite, skip, take }) {
  const [[{ total }], dados] = await prisma.$transaction([
    prisma.$queryRaw`
      SELECT COUNT(*)::int AS total
      FROM boarding_pass bp
      JOIN passenger p ON bp.passenger_id = p.passenger_id
      JOIN flight f ON bp.flight_id = f.flight_id
      JOIN aircraft a ON f.aircraft_id = a.aircraft_id`,
    prisma.$queryRaw`
      SELECT
          bp.boarding_pass_id AS boarding_pass_id,
          bp.seat_number AS seat_number,
          bp.issue_time AS issue_time,
          p.first_name AS passenger_first_name,
          p.last_name AS passenger_last_name,
          p.birth_date AS passenger_birth_date,
          p.passport_number AS passenger_passport_number,
          f.flight_number AS flight_number,
          f.departure_airport AS departure_airport,
          f.arrival_airport AS arrival_airport,
          f.departure_time AS departure_time,
          f.arrival_time AS arrival_time,
          a.model AS aircraft_model,
          a.manufacturer AS aircraft_manufacturer,
          a.capacity AS aircraft_capacity
      FROM
          boarding_pass bp
      JOIN
          passenger p ON bp.passenger_id = p.passenger_id
      JOIN
          flight f ON bp.flight_id = f.flight_id
      JOIN
          aircraft a ON f.aircraft_id = a.aircraft_id
      ORDER BY
          bp.boarding_pass_id
      LIMIT ${take} OFFSET ${skip}`,
  ]);

  return { pagina, limite, total, dados };
}

module.exports = { listar, buscarPorId, listarDetalhes };
