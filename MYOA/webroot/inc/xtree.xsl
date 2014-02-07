<?xml version="1.0"?>

<xsl:stylesheet xmlns:xsl="http://www.w3.org/TR/WD-xsl">
<xsl:template match="/">
<xsl:apply-templates select="TreeNode"/>
</xsl:template>

<xsl:template match="TreeNode">
<xsl:for-each select="./TreeNode">
<div class="TreeNode"  nowrap="true">
<xsl:attribute name="uid"><xsl:value-of select="@id"/></xsl:attribute>
<xsl:attribute name="id"><xsl:value-of select="@id"/></xsl:attribute>
<xsl:if test=".[TreeNode or @Xml]">
	<xsl:attribute name="open">false</xsl:attribute>
</xsl:if>
<xsl:attribute name="type">
<xsl:choose>
	<xsl:when test=".[TreeNode or @Xml]">parent</xsl:when>
	<xsl:otherwise>leaf</xsl:otherwise>
</xsl:choose>
</xsl:attribute>

<xsl:choose>
  <xsl:when test=".[TreeNode or @Xml]">
    <img type="img" align="absmiddle">
    <xsl:attribute name="src">/images/collapsed.gif</xsl:attribute>
    </img>
  </xsl:when>
  <xsl:otherwise>
    <img type="img" align="absmiddle" border="0">
    <xsl:attribute name="src">/images/transparent.gif</xsl:attribute>
    </img>
  </xsl:otherwise>
</xsl:choose>
<img type="img" align="absmiddle" width="16" height="16">
<xsl:attribute name="src">
  <xsl:value-of select="@img_src"/>
</xsl:attribute>
</img>
<xsl:choose>
	<xsl:when test="@onclick">
    <input type="checkbox">
        <xsl:attribute name="onclick"><xsl:value-of select="@onclick" /></xsl:attribute>
    </input>
   </xsl:when>
</xsl:choose>
<span type="label">
 <xsl:attribute name="title">
	<xsl:choose>
	<xsl:when test="@title"><xsl:value-of select="@title"/></xsl:when>
	<xsl:otherwise><xsl:value-of select="@text"/></xsl:otherwise>
	</xsl:choose>
</xsl:attribute>
<xsl:choose>
<xsl:when test="@href">
<a>
	<xsl:choose>
	<xsl:when test="@target">
		<xsl:attribute name="target"><xsl:value-of select="@target" /></xsl:attribute>
	</xsl:when>
	<xsl:otherwise>
		<xsl:attribute name="target">frmMain</xsl:attribute>
	</xsl:otherwise>
</xsl:choose>
<xsl:attribute name="tabindex">-1</xsl:attribute>
<xsl:attribute name="href"><xsl:value-of select="@href" /></xsl:attribute>
<xsl:value-of select="@text" />
</a>
</xsl:when>
<xsl:otherwise>
<xsl:value-of select="@text" />
</xsl:otherwise>
</xsl:choose>
</span>
<xsl:if test=".[TreeNode or @Xml]">
<div type="container" class="container" style="display:none">
	<xsl:if test="@Xml">
		<xsl:attribute name="XmlSrc"><xsl:value-of select="@Xml"/></xsl:attribute>
	</xsl:if>
	<xsl:choose>
	<xsl:when test="./TreeNode">
	<xsl:attribute name="send">true</xsl:attribute>
	<xsl:apply-templates select="."/>
	</xsl:when>
	<xsl:otherwise><xsl:attribute name="send">false</xsl:attribute>&#160;</xsl:otherwise>
	</xsl:choose>
</div>
</xsl:if>
</div>
</xsl:for-each>
</xsl:template>
</xsl:stylesheet>
