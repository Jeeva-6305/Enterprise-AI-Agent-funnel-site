const { queryAll, queryOne, runQuery } = require('../config/database');

class LeadModel {
  /**
   * Insert a new lead into SQL database
   */
  static async create(data) {
    const {
      fullName,
      workEmail,
      jobTitle,
      companyName,
      companySize,
      phoneCountryCode = '+91',
      phoneNumber,
      sourceCampaign = 'Enterprise-AI Agents Funnel',
      ipAddress = null,
      notes = null
    } = data;

    const sql = `
      INSERT INTO leads (
        full_name, work_email, job_title, company_name, 
        company_size, phone_country_code, phone_number, 
        source_campaign, ip_address, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      fullName.trim(),
      workEmail.trim().toLowerCase(),
      jobTitle.trim(),
      companyName.trim(),
      companySize.trim(),
      phoneCountryCode.trim(),
      phoneNumber.trim(),
      sourceCampaign,
      ipAddress,
      notes
    ];

    const result = await runQuery(sql, params);
    return this.findById(result.lastID);
  }

  /**
   * Find lead by ID
   */
  static async findById(id) {
    const sql = `SELECT * FROM leads WHERE id = ?`;
    return queryOne(sql, [id]);
  }

  /**
   * Find lead by Work Email
   */
  static async findByEmail(email) {
    const sql = `SELECT * FROM leads WHERE LOWER(work_email) = ? ORDER BY created_at DESC LIMIT 1`;
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

    if (search && search.trim() !== '') {
      whereClauses.push(`(
        full_name LIKE ? OR 
        work_email LIKE ? OR 
        company_name LIKE ? OR 
        job_title LIKE ? OR 
        phone_number LIKE ?
      )`);
      const searchParam = `%${search.trim()}%`;
      params.push(searchParam, searchParam, searchParam, searchParam, searchParam);
    }

    if (status && status.trim() !== '' && status !== 'ALL') {
      whereClauses.push(`status = ?`);
      params.push(status.trim());
    }

    if (companySize && companySize.trim() !== '' && companySize !== 'ALL') {
      whereClauses.push(`company_size = ?`);
      params.push(companySize.trim());
    }

    const whereSql = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    // Validate sort column to avoid SQL injection
    const allowedSortCols = ['id', 'full_name', 'work_email', 'job_title', 'company_name', 'company_size', 'status', 'created_at'];
    const validSortCol = allowedSortCols.includes(sortBy) ? sortBy : 'created_at';
    const validSortOrder = sortOrder.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

    // Count total query
    const countSql = `SELECT COUNT(*) as total FROM leads ${whereSql}`;
    const countRow = await queryOne(countSql, params);
    const total = countRow ? countRow.total : 0;

    // Data query with pagination
    const offset = (Math.max(1, parseInt(page)) - 1) * parseInt(limit);
    const dataSql = `
      SELECT * FROM leads 
      ${whereSql} 
      ORDER BY ${validSortCol} ${validSortOrder} 
      LIMIT ? OFFSET ?
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

    if (status) {
      sets.push('status = ?');
      params.push(status);
    }

    if (notes !== undefined) {
      sets.push('notes = ?');
      params.push(notes);
    }

    sets.push('updated_at = CURRENT_TIMESTAMP');
    params.push(id);

    const sql = `UPDATE leads SET ${sets.join(', ')} WHERE id = ?`;
    await runQuery(sql, params);
    return this.findById(id);
  }

  /**
   * Delete lead by ID
   */
  static async delete(id) {
    const sql = `DELETE FROM leads WHERE id = ?`;
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
      SELECT company_size, COUNT(*) as count 
      FROM leads 
      GROUP BY company_size 
      ORDER BY count DESC
    `);

    const recentLeads = await queryAll(`
      SELECT * FROM leads 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    return {
      totalLeads: totalLeadsRow ? totalLeadsRow.total : 0,
      newLeads: newLeadsRow ? newLeadsRow.count : 0,
      qualifiedLeads: qualifiedRow ? qualifiedRow.count : 0,
      statusCounts,
      companySizeBreakdown,
      recentLeads
    };
  }
}

module.exports = LeadModel;
