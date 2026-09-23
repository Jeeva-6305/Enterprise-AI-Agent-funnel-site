const { queryAll, queryOne, runQuery } = require('../config/database');

class LeadModel {
  /**
   * Insert a new lead into PostgreSQL database
   */
  static async create(data) {
    const {
      funnel_id,
      funnel_source,
      full_name,
      email,
      phone = null,
      company = null,
      job_title = null,
      use_case = null,
      message = null,
      campaign = null,
      status = 'New',
      source_url = null,
      ip_address = null,
      raw_payload = {}
    } = data;

    const sql = `
      INSERT INTO leads (
        funnel_id, funnel_source, full_name, email, phone, company,
        job_title, use_case, message, campaign, status, source_url,
        ip_address, raw_payload
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING *
    `;

    const params = [
      funnel_id,
      funnel_source,
      full_name.trim(),
      email.trim().toLowerCase(),
      phone ? phone.trim() : null,
      company ? company.trim() : null,
      job_title ? job_title.trim() : null,
      use_case || null,
      message || null,
      campaign || null,
      status,
      source_url || null,
      ip_address || null,
      JSON.stringify(raw_payload)
    ];

    const newLead = await queryOne(sql, params);
    return newLead;
  }

  /**
   * Find lead by ID
   */
  static async findById(id) {
    const sql = `SELECT * FROM leads WHERE id = $1`;
    return queryOne(sql, [id]);
  }

  /**
   * Find lead by Email
   */
  static async findByEmail(email) {
    const sql = `SELECT * FROM leads WHERE LOWER(email) = LOWER($1) ORDER BY created_at DESC LIMIT 1`;
    return queryOne(sql, [email.toLowerCase().trim()]);
  }

  /**
   * Find all leads with flexible filtering, search, sorting and pagination
   */
  static async findAll({
    search = '',
    status = '',
    companySize = '',
    sortBy = 'created_at',
    sortOrder = 'DESC',
    page = 1,
    limit = 50
  } = {}) {
    const whereClauses = [];
    const params = [];
    let paramCount = 1;

    if (search && search.trim() !== '') {
      whereClauses.push(`(
        full_name ILIKE $${paramCount} OR
        email ILIKE $${paramCount + 1} OR
        company ILIKE $${paramCount + 2} OR
        job_title ILIKE $${paramCount + 3} OR
        phone ILIKE $${paramCount + 4}
      )`);
      const searchParam = `%${search.trim()}%`;
      params.push(searchParam, searchParam, searchParam, searchParam, searchParam);
      paramCount += 5;
    }

    if (status && status.trim() !== '' && status !== 'ALL') {
      whereClauses.push(`status = $${paramCount}`);
      params.push(status.trim());
      paramCount++;
    }

    if (companySize && companySize.trim() !== '' && companySize !== 'ALL') {
      whereClauses.push(`funnel_id = $${paramCount}`);
      params.push(companySize.trim());
      paramCount++;
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Validate sort column to avoid SQL injection
    const allowedSortCols = ['id', 'full_name', 'email', 'job_title', 'company', 'funnel_id', 'status', 'created_at'];
    const validSortCol = allowedSortCols.includes(sortBy) ? sortBy : 'created_at';
    const validSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Count total query
    const countSql = `SELECT COUNT(*) as total FROM leads ${whereSql}`;
    const countRow = await queryOne(countSql, params);
    const total = countRow ? parseInt(countRow.total) : 0;

    // Data query with pagination
    const offset = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const dataSql = `
      SELECT * FROM leads
      ${whereSql}
      ORDER BY ${validSortCol} ${validSortOrder}
      LIMIT $${paramCount} OFFSET $${paramCount + 1}
    `;

    const dataParams = [...params, parseInt(limit), offset];
    const leads = await queryAll(dataSql, dataParams);

    return {
      leads,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(total / parseInt(limit))
      }
    };
  }

  /**
   * Update lead status or notes
   */
  static async updateStatus(id, { status, notes }) {
    const sets = [];
    const params = [];
    let paramCount = 1;

    if (status) {
      sets.push(`status = $${paramCount}`);
      params.push(status);
      paramCount++;
    }

    if (notes !== undefined) {
      sets.push(`notes = $${paramCount}`);
      params.push(notes);
      paramCount++;
    }

    sets.push(`updated_at = CURRENT_TIMESTAMP`);
    params.push(id);

    const sql = `UPDATE leads SET ${sets.join(', ')} WHERE id = $${paramCount} RETURNING *`;
    await runQuery(sql, params);
    return this.findById(id);
  }

  /**
   * Delete lead by ID
   */
  static async delete(id) {
    const sql = `DELETE FROM leads WHERE id = $1`;
    const result = await runQuery(sql, [id]);
    return result.changes > 0;
  }

  /**
   * Aggregate statistics for Admin Dashboard
   */
  static async getStats() {
    const totalLeadsRow = await queryOne(`SELECT COUNT(*) as total FROM leads`);
    const newLeadsRow = await queryOne(`SELECT COUNT(*) as count FROM leads WHERE status = 'New'`);
    const qualifiedRow = await queryOne(`SELECT COUNT(*) as count FROM leads WHERE status IN ('Qualified', 'Demo Scheduled')`);

    const statusCounts = await queryAll(`
      SELECT status, COUNT(*) as count
      FROM leads
      GROUP BY status
      ORDER BY count DESC
    `);

    const companySizeBreakdown = await queryAll(`
      SELECT funnel_id, COUNT(*) as count
      FROM leads
      GROUP BY funnel_id
      ORDER BY count DESC
    `);

    const recentLeads = await queryAll(`
      SELECT * FROM leads
      ORDER BY created_at DESC
      LIMIT 5
    `);

    return {
      totalLeads: totalLeadsRow ? parseInt(totalLeadsRow.total) : 0,
      newLeads: newLeadsRow ? parseInt(newLeadsRow.count) : 0,
      qualifiedLeads: qualifiedRow ? parseInt(qualifiedRow.count) : 0,
      statusCounts,
      companySizeBreakdown,
      recentLeads
    };
  }
}

module.exports = LeadModel;
